import React from 'react';
import NavBar from './Navbar/Navbar';
import ProfilePageBody from './ProfilePageBody/ProfilePageBody';

function ProfilePage(){

    return(
      <React.Fragment>
        <NavBar/>
        <ProfilePageBody/>
      </React.Fragment>
    )
}
export default ProfilePage;