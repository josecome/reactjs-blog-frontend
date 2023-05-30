import React from 'react';
import axios from 'axios';

function Home() {
  const { useState, useEffect } = React;
  const [post, setPost] = useState([]);
  const [postlikes, setPostLikes] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [useratributes, setUseratributes] = useState([]);
  const [commenttxt, setPostCommenttxt] = useState('');
  const [initialState, setInitialState] = useState(false)
  //const [countPostClick, setCountPostClick] = useState(0)

  useEffect(() => {
      if(!initialState){
          axios.get("http://127.0.0.1:8000/api/postlist").then((data) => {      
              setPost(data?.data);
              console.log(data.data)
              let postids = data.data.map(i => {return i.fields.user})
              let ids_of_posts = String(postids.filter(onlyUnique))
              loadUserAtrib(ids_of_posts);
          });    
          setInitialState(true)     
      }
      getData("postlikes");
      getData("postcomments");
  }, []);

  function search(k, arr) {
      return arr[k] || 0
  };
  function onlyUnique(value, index, array) {
      return array.indexOf(value) === index;
  };
  async function loadUserAtrib(ids_of_posts) {
      await axios.get('http://127.0.0.1:8000/api/useratrib/', { params: { ids: ids_of_posts } }).then((data) => {
         var arr = {};
         let v = data.data.split(';')
         for (var i = 0; i < v.length; i++) {
              var s = v[i].split(':');
              if(s[0] === null || s[0] === '' || s[0] === 'null' || typeof s[0] === 'undefined') {
                  break;
              }
              arr[s[0].trim()] = s[1].trim();
          }
          setUseratributes(arr)
          console.log('User: ' + useratributes)
      })
  }

  async function getData(pg) {
     //setCountPostClick(countPostClick + 1)
     await axios.get('http://127.0.0.1:8000/api/' + pg).then((data) => {
         var arr = {};
         let v = data.data.split(';')
         for (var i = 0; i < v.length; i++) {
              var s = v[i].split(':');
              if(s[0] === null || s[0] === '' || s[0] === 'null' || typeof s[0] === 'undefined') {
                  break;
              }
              arr[s[0].trim()] = s[1].trim();
          }
          if(pg === "postlikes") {
             setPostLikes(arr);                    
          }
          else if(pg === "postcomments") {
              setPostComments(arr); 
          }
          
      })
  };
  async function sendData(vtype_of_like, vpost_id) {
      let rs_response = ""
      let link = ""

      if(vtype_of_like === "like") {
          link = "/addremovelike/" 
      } else if(vtype_of_like === "comment") {
          link = "/addcomment/"
      }
      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      const v = {"post_id": vpost_id, "type_of_like": vtype_of_like, "txt": commenttxt }            
      await axios.post('http://127.0.0.1:8000' + link, v, 
          {
              headers: {
                  'X-CSRFToken': csrftoken
              }
          })
          .then((response) => {
              rs_response = response.data
              console.log("rs: " + rs_response)
              if(vtype_of_like === "like") {
                 getData("postlikes"); 
              } else if(vtype_of_like === "comment") {
                 getData("postcomments");
              }    
          }, (error) => {
              rs_response = error;
          });
  }
  const userStylePic = {
      backgroundColor: "#AED6F1",
      width: "50px",
      height: "50px",
      float: "left",
      textAlign: "center",
      borderRadius: "50%",
      fontSize: "32px",
      paddingLeft: "10px",
  };
  const userStylePic2 = {
      backgroundColor: "#AED6F1",
      width: "20px",
      height: "20px",
      float: "left",
      borderRadius: "50%",
      fontSize: "12px",            
      paddingLeft: "10px",
      display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  };
  const divstyle = {
      height: "120px"
  };
  const divcontstyle = {
      height: "100px",
      marginRight: "10%"
  };
  const styleUserProfile = {
      textAlign: "left",
  };
  const optionsStyle = {
      paddingLeft: "10px",
  };
  const lineStyle = {
      width: "100%",
      color: "gray"
  }
  const divcommentStyle = {
      width: "80%",  
      border: "1px solid gray",
      borderRadius: "6px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "20px",
      listStyle: "none",
      padding: "2px 4px",
      display: "inline-block"
  };
  const commentStyle = {
    border: "0px",          
  };
  const commenticons = {
    textAlign: "right",
    float: "right",
  };
  const centerText = {
      textAlign: "center",            
  }
  const timeOfPost = {
      fontSize: "10px"
  };
  const likesStyle = {
      backgroundColor: "#3498DB",
      borderRadius: "50%",
      color: "white",
      textAlign: "center"
  };
  const div_content_style = {
      backgroundColor: "white",
      borderRadius: "26px",  
      margin: "10px",          
  };
  const table_of_content_style = {
      margin: "16px",
  };
  const commentMargin = {
      marginLeft: "16px",
  };
  const btnSendComment = {
      marginLeft: "16px",
      color: "#3498DB",
  };
  const container = {
      border: "1px solid grey",
      display: "flex",
  };
  const content = {
      flexGrow: "1",
      margin: "5px",
  };
  const sidecontent = {
      margin: "5px 5px 5px 0",
  };
  const removeStyle = {
      all: "unset",
  };
  return (
          <div>  
                    { post.map(p => ( 
                        <div key={ p.pk } style={ div_content_style }>
                            <table style={ table_of_content_style }>
                                <tbody>
                                    <tr>
                                        <td>
                                            <a href={ 'posts/' + search(p.fields.user, useratributes) } style={ styleUserProfile }>
                                                <label style={ userStylePic }><span style={ centerText }>{ p.fields.topic }</span></label>
                                            </a>

                                            <a href={ 'content/' + p.fields.link } style={ styleUserProfile }>
                                                { p.fields.title }
                                            </a> <br />
                                            <span style={ timeOfPost }>0 days</span>
                                        </td>    
                                    </tr>
                                    <tr>
                                        <td>
                                            { p.fields.post_content.slice(0, 200) + "..." } <br />
                                            <span style={ likesStyle }>
                                                <i className="bi bi-hand-thumbs-up"></i>
                                            </span> { search(p.pk, postlikes) }
                                            <span style={ commentMargin }>
                                                <i className="bi bi-chat-left"></i>
                                            </span> { search(p.pk, postComments) }                    
                                        </td>                                   
                                    </tr> 
                                    <tr>
                                        <td><hr style={ lineStyle } /></td>
                                    </tr>      
                                    <tr>
                                        <td>
                                            <i className="bi bi-hand-thumbs-up" onClick={() => sendData('like', p.pk) }></i> Like   
                                            <i className="bi bi-chat-left" style={ optionsStyle }></i> comment    
                                            <i className="bi bi-share" style={ optionsStyle }></i> share
                                        </td>
                                    </tr>  
                                    <tr>
                                        <td><hr style={ lineStyle } /></td>
                                    </tr>   
                                    <tr>
                                        <td>
                                            <label style={ userStylePic2 } className="centerText"><span>{ p.fields.topic }</span></label>
                                            <div style={ divcommentStyle } >
                                                <input type="text"                                                 
                                                    style={ commentStyle } 
                                                    onChange={(e) => { setPostCommenttxt(e.target.value)}}
                                                    placeholder="Write a comment..." />
                                                    <span style={ commenticons }>
                                                        <i className="bi bi-emoji-smile" style={ optionsStyle }></i>
                                                        <i className="bi bi-image" style={ optionsStyle }></i>
                                                        <i className="bi bi-hand-thumbs-up" style={ optionsStyle }></i>
                                                        <i className="bi bi-hand-thumbs-down" style={ optionsStyle }></i>
                                                        <i className="bi bi-heart" style={ optionsStyle }></i>
                                                        <i className="bi bi-handbag" style={ optionsStyle }></i>
                                                    </span>
                                            </div>  
                                            <i className="bi bi-send" style={ btnSendComment } title={ "Post Comment" } onClick={() => sendData('comment', p.pk) }>
                                                <span style={ removeStyle }>Post</span>
                                            </i>  
                                        </td>    
                                    </tr>    
                                </tbody>    
                            </table>    
                            <br /><br />                   
                        </div> 
                    )) }                         
        </div>
  );
}

export default Home;