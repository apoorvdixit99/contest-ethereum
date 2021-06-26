import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <Menu style={{ marginTop: '20px' }}>
            <Link route="/">
                <a className="item">D.C.M.S.</a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/new">
                    <a className="item">Create</a>
                </Link>
                <Link route="/list">
                    <a className="item">List</a>
                </Link>
                <Link route="/participate">
                    <a className="item">Participate</a>
                </Link>
                <Link route="/verify">
                    <a className="item">Verify</a>
                </Link>
                <Link route="/setwinner">
                    <a className="item">Set Winner</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};

/* 
Key points:
* route sttribute of Link tag tells the browser the route to redirect to
* anchor tag is put inside the Link tag
*/