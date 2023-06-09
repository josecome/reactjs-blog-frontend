import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Content() {
    const { useState, useEffect } = React;
    let { link } = useParams();
    const [title, setTitle] = useState('Title');
    const [post_content, setPost_content] = useState('Post Content');
    const [initialState, setInitialState] = useState(false);
    
    useEffect(() => {
        if(!initialState){   
            console.log('link: ' + link)        
            axios.get(`http://127.0.0.1:8000/api/post/${ link }`).then((data) => {      
                var rs_response = data.data[0].fields
                console.log(rs_response)
                setTitle(rs_response.title)
                setPost_content(rs_response.post_content)
            }); 

            setInitialState(true);     
        }
    }, []);

    const styleMainDiv = {
        width: '80%',
        padding: '20px',
        textAlign: 'left'
    };
    const styleBlueColor = {
        color: 'blue'
    }
    const styleLink = {
        marginLeft: '6px',
        color: 'grey'
    }
    return (
        <div>
            <div style={ styleMainDiv }>
                <h1 style={ styleBlueColor }>{ title }
                    <a href={ `/create_content/${ link }` }
                        class="bi bi-pencil" 
                        style={ styleLink }
                        title="Edit Content">
                    </a>
                </h1>
                { post_content }
            </div>
        </div>
    );
}
export default Content;