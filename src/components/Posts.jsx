import React, { useEffect, useState } from 'react';
import { Post } from '../services/post_services';
import { PostCard} from './PostCard';
import { useUserInfo } from '../utils/userContext';
import { PostForm } from './PostForm';


export const Posts = ({user}) => {
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const {userPicture} = useUserInfo();
  const [loading, setLoading] = useState(true);

  const postsData = new Post();

  useEffect(() => {
    const fetchPosts = async () => {
      const p = await postsData.getPostsData(); 
      setPostIds(p[0]);
      setPosts(p[1]);
      
    };
    try {
      fetchPosts();
      console.log('Posts fetched!');
      console.log(posts);
      console.log(postIds);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }, []);

  
  const handleCommentSubmit = async (postId, comment) => {
    const newPosts = posts.map((post, i) => {
      if (postIds[i] === postId) {
        setIndex(i);
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      
      return post;
    });
    setPosts(newPosts);  
    console.log(comment);
    postsData.addComment(postId, comment);

    console.log(comment);
  };

  // list of emojis feel free to change it up or add 
  const emojiList = ["👍", "❤️", "😂", "😊"];

  // for clicking emoji
  const handleEmojiClick = (postId, emoji) => {
    const updatedPosts = posts.map((post) => {
      if (postIds[posts.indexOf(post)] === postId) {
        const updatedReactions = { ...post.reactions };
        updatedReactions[emoji] = updatedReactions[emoji] ? updatedReactions[emoji] + 1 : 1;
        return {
          ...post,
          reactions: updatedReactions,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  if (loading) {
    return <div>Loading...</div>;
  }
    postsData.updatePosts(newPosts[0], postId, user.sub);
    
 };

 const removePost = async (postId) => {
  
  const newPosts = posts.filter((post, index) => {
    console.log(post);
    return postIds[index] != postId;
  });
  const newPostIds = postIds.filter((id) => id != postId);
  setPosts(newPosts);
  setPostIds(newPostIds);
  const deletePost = await postsData.deletePost(postId);

 }

 const createPost = (newPost, newPostId) => {
  setPosts([...posts, newPost]);
  setPostIds([...postIds, newPostId]);
 }


  return (
    <>
      <div style={styles.container}>

        <PostForm user={user} createPost={createPost} postsData={postsData} />

        {posts.length > 0 ? (
          posts.map((post, index) => (
            
            <PostCard key={postIds[index]} post={post} id= {postIds[index]} user={user} handleCommentSubmit={handleCommentSubmit} postsData={postsData} removePost={removePost} />
            
          ))
        ) : (
          <div>No data found :(</div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '800px',
  },
  postContainer: {
    border: '2px solid #ddd',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },

  postContainerForm: {
    display: "block",
    width: "30%",
    margin: "0 auto",
  },

  username: {
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#000000',
    margin: '0 5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  },
  inputContainer: {
    background: 'linear-gradient(21deg, #d6c7e5, violet)',
    padding: '3px',
  },
  emojiContainer: {
    marginTop: '10px',
  },
  emojiButton: {
    fontSize: '20px',
    margin: '5px',
    background: 'linear-gradient(21deg, #d6c7e5, violet)',
    border: 'none',
    cursor: 'pointer',
  },
  reactionsContainer: {
    marginTop: '10px',
    fontSize: '16px',
  },
  reaction: {
    marginRight: '10px',
  },
  input: {
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    color: '#000000',
    minWidth: '12em',
    padding: '0.325em',
    border: 'none',
    outline: 'none',
    transition: 'all 0.3s',
    backgroundColor: '#e6e6fa',
    marginBottom: '10px',
  },

  textarea: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
    minHeight: '60px',
    background: 'linear-gradient(21deg, #d6c7e5, violet)',
    color: '#000000',
  },
  button: {
    backgroundColor: '#9966CC',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
  },
  fileInput: {
    marginTop: '10px',
    padding: '5px',
  },
  imagePreview: {
    marginTop: '10px',
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '8px',
  },
  imageUploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  postImage: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '15px',
    marginTop: '15px',

   },
  commentImage: {
    marginTop: '10px',
    maxWidth: '100px',
    maxHeight: '100px',
    borderRadius: '8px',
    
  },
  
};

export default Posts;
    