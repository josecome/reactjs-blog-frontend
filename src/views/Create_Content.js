import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Create_Content() {
    const { useState, useEffect } = React;
    let { link } = useParams();
    const [title, setTitle] = useState('Title');
    const [post_content, setPost_content] = useState('Post Content');
    const [post_type, setPost_type] = useState('Post Content');
    const [initialState, setInitialState] = useState(false);

    useEffect(() => {
        if(!initialState){  
            console.log('link: ' + link)        
            axios.get(`http://127.0.0.1:8000/api/post/${ link }`).then((data) => {      
                var rs_response = data.data[0].fields
                console.log(rs_response)
                setTitle(rs_response.title)
                setPost_content(rs_response.post_content)
                setPost_type(rs_response.post_type)
            }); 

            setInitialState(true);     
        }
    }, []);

    const styleMainDiv = {
        width: '80%',
        padding: '20px',
        textAlign: 'left'
    };
    const styleForm = {
        marginLeft: '20px'
    }
    
    return (
        <div style={ styleMainDiv }>
            <form action="/contents/create_content_add/" method="POST" style={ styleForm }>
                <table>
                    <tr>
                        <td>Title</td>
                    </tr>
                    <tr>
                        <td><input type='text' value={ title } /></td>
                    </tr>
                    <tr>
                        <td>Body</td>
                    </tr>
                    <tr>
                        <td>
                            
                            <textarea 
                                id="content" 
                                name="content" 
                                rows="4" 
                                cols="50" 
                                value={ post_content }
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Type</td>
                    </tr>
                    <tr>
                        <td>                            
                            <select name="posttype" id="posttype">
                                <option value={ post_type }>{ post_type }</option>
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                            </select>
                        </td>
                    </tr>
                </table>        
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
export default Create_Content;