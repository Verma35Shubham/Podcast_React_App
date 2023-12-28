import React from "react";
import Header from "../components/Common/Header";
import CreatePodcastForm from "../components/StartAPodcast/CreatePodcastForm";

const CreateAPodcastPage = () => {
    return (
        <div>
            <Header/>
            <div className="input-wrapper">
                <h1>Create A Poadcast</h1>
                <CreatePodcastForm/>
            </div>
        </div>
    );
}
export default CreateAPodcastPage;