import './App.css';

function Home() {
  return (
          <div>  
              { post.map(p => ( 
                <div key={ p.pk } style={ divstyle }>
                  <label style={ topicstyle }>{ p.fields.topic }</label>
                  <div style={ divcontstyle }>
                     <a href={ p.fields.lnk }>{ p.fields.title }</a><br />
                        { p.fields.body.slice(0, 200) + "..." }
                  </div>
                  <br /><br />                   
                </div> 
             )) }                            
        </div>
  );
}

export default Home;