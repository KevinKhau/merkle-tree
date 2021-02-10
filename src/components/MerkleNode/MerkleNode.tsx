import React from 'react';

class MerkleNode extends React.Component {

    hash(message: string) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);

        // hash the message
        const dti = () => crypto.subtle.digest('SHA-256', msgBuffer);
        const sp = require('synchronized-promise')
        const syncDti = sp(dti)

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(syncDti));

        // convert bytes to hex string
        return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    }

    render() {
        return <div></div>;
    }
}

export default MerkleNode;
