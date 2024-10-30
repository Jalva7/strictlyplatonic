
import React, { useEffect, useState } from 'react';
import Schedule from './Schedule';
import '../bio.css';

export const MyProfile = ({user}) => {
    //Changing this so that if the user logs in and they have a profile picture already 
    //then this picture will the default state. 
    const [profilePicture, setProfilePicture] = useState('');
    const [name, setName] = useState('type your name here...');
    const [bio, setBio] = useState('type your bio here...');
    const [hobbies, setHobbies] = useState('enter your hobbies here....')


    //On initial render, if there are items that have been changed, then will loaded from the localStorage. 
    useEffect(() => {
        //Once we have a database, however, this will be changed to an asynchronous call to the database, to retrieve this information. 
        //TO DO: replace this with a try-catch block and async call to the user-information/management database 
        const savedPicture = localStorage.getItem('profilePicture');
        const savedName = localStorage.getItem('name');
        const savedBio = localStorage.getItem('bio')
        const savedHobbies = localStorage.getItem('hobbies')
        if(savedPicture) {
            console.log(savedPicture)
            console.log("Changing to saved picture")
            setProfilePicture(savedPicture);
        } 
        if(savedName) {
            setName(savedName)
        } 

        if(savedBio) {
            setBio(savedBio)
        }
        
        if (savedHobbies) {
            setHobbies(savedHobbies)
        } 
    }, [])

const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('profilePicture', profilePicture);
        localStorage.setItem('name', name)
        localStorage.setItem('bio', bio)
        localStorage.setItem('hobbies', hobbies)
        alert('Your profile has been updated successfully!');

    };





    return (
        <>

        <div className='postContainer'>
        <div>
            
            {profilePicture && (
                <img id="preview" src={profilePicture} alt="Profile Preview" style={{ display: 'block' }} />
            )}
            <form id="uploadForm" onSubmit={handleEditSubmit}>
                <label htmlFor="profilePicture">Change profile picture:</label>
                <input
                    type="file"
                    id="profilePicture"
                    file="image/*"
                    onChange={handleFileChange}
                    required
                />
                <br /><br />
                <button type="submit">Upload</button>
            </form>
            </div>
            
            {/* This displays profile content as is without changes applied */}
            <div className="profile">
                <h2>Profile Information</h2>
                <p><strong>Name:</strong> <span>{name}</span></p>
                <p><strong>Email:</strong> <span>{user.email}</span></p>
                <p><strong>Bio:</strong> <span>{bio}</span></p>
                <p><strong>Hobbies:</strong> <span>{hobbies}</span></p>
            </div>

            {
            /* This form allows the user to edit information about their profile. 

                Requires: form validation and testing 
                
            */}
            <div style={styles.postContainer}>
            <h1 style={styles.header}>Edit Profile</h1>
            <form id="editForm" onSubmit={handleEditSubmit}>
                <label htmlFor="name">Name:</label><br />
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br /><br />

                <label htmlFor="bio">Bio:</label><br />
                <textarea
                    id="bio"
                    rows="4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                /><br /><br />

                <label htmlFor="hobbies">Hobbies:</label><br />
                <textarea
                    id="hobbies"
                    rows="4"
                    value={hobbies}
                    onChange={(e) => setHobbies(e.target.value)}
                /><br /><br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
             {/* Create Scheduling Input Form Here  */}
             <Schedule />


        </div>
</>
        
    )
}

const styles = {
    postContainer: {
        border: '2px solid #ddd',
        marginBottom: '20px',
        padding:'20px',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
     
      },
      header: {
        fontSize: '35px', 
        marginBottom: '20px',
        fontWeight: 'bold',
        margin: '5px 0'
}
}


