import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../components/Common/Inputs";
import FileInput from "../components/Common/Inputs/FileInput";
import Button from "../components/Common/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { setPodcasts } from "../slices/podcastSlice";

const CreateAnEpisodePage = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [audioFile, setAudioFile] = useState();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const podcasts = useSelector((state) => state.podcasts.podcasts);   
    
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "podcasts")),
            (querySnapshot) => {
                const podcastsData = [];
                querySnapshot.forEach((doc) => {
                    podcastsData.push({id: doc.id, ...doc.data});
                });
                dispatch(setPodcasts(podcastsData));
            },
            (error) => {
                console.error("Error fetching podcasts:", error);
            }
        );
        return () => {
            unsubscribe();
        };
    },[dispatch]);

    const audioFileHandler = (file) => {
        setAudioFile(file);
    }
    const handleSubmit = async() => {
        setLoading(true);
        if((title, description, audioFile, id)){
            try {
                const audioRef = ref(storage, `podcast-episode/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(audioRef, audioFile);

                const audioURL = await getDownloadURL(audioRef);
                const episodeData = {
                    title: title,
                    description: description, 
                    audioFile: audioURL
                };

                await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
                toast.success("Episode Created Successfully.");
                setLoading(false);
                navigate(`/podcast/${id}`);
                setTitle("");
                setDescription("");
                setAudioFile("");
            } catch (error) {
                toast.error(error.message);
                setLoading(false);
            }
        }else{
            toast.error("All field requied.")
            setLoading(false);
        }
    }

    return (
        <div>
            <Header/>
            <div className="input-wrapper">
                <h1>Create An Episode</h1>
                <InputComponent state={title} setState={setTitle} placeholder="Title" type="text" required={true}/>
                <InputComponent state={description} setState={setDescription} placeholder="Description" type="text" required={true}/>
                <FileInput accept={"audio/*"} id="audio-file-input" fileHandleFnc={audioFileHandler} text={"upload your audio here.."} />
                <Button  text={loading ? "Loading..." : "Create Episode"} disabled={loading} onClick={handleSubmit}/>
            </div>
        </div>
    );
}
export default CreateAnEpisodePage;