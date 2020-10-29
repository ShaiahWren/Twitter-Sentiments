import React, { Component } from 'react';
import './Navbar.css';
import TwitterIcon from '@material-ui/icons/Twitter';



class Navbar extends Component {
    render() {
        return (
            <div class="sidenav">
                <TwitterIcon className="twitter" style={{ fontSize:150}}/>
              <p className="sent">sen</p>
              <p className="tweet">TWEET</p>
              <p className="ment">ments</p>
            </div> 


        )
    }
}

export default Navbar;