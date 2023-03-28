// pages/votes.js

import {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

export default function Votes() {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVotes();
    }, []);

    const fetchVotes = async () => {
        try {
            const res = await axios.get('/api/votes');
            setImages(res.data);
        } catch (error) {
            console.error('Error fetching votes:', error);
            setError(`Error fetching votes: ${
                error.message
            }`);
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Ordinal Mash - Votes</title>
            </Head>
            <h1>Image Votes</h1>
            {
            error ? (
                <p>{error}</p>
            ) : (
                <div className="images-grid">
                    {
                    images.map((image) => (
                        <div key={
                                image.id
                            }
                            className="image-card">
                            <img src={
                                    image.path
                                }
                                alt={
                                    `Image ${
                                        image.id
                                    }`
                                }/>
                            <p>Votes: {
                                image.votes
                            }</p>
                        </div>
                    ))
                } </div>
            )
        }
            <Link href="/">
                Back to Home
            </Link>
            {/* Add the same CSS from the previous example */} </div>
    );
}
