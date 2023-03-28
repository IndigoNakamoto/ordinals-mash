import {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await axios.get('/api/elo');
            console.log("API response:", res.data); // Add this line

            if (res.data.image1 && res.data.image2) {
                setImage1(res.data.image1);
                setImage2(res.data.image2);
            } else {
                throw new Error('Images data is incomplete or missing');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setError(`Error fetching images: ${
                error.message
            }`);
        }
    };


    const handleVote = async (winnerId, loserId) => {
        try {
            await axios.post('/api/elo', {
                winner_id: winnerId,
                loser_id: loserId
            });
            fetchImages();
        } catch (error) {
            console.error('Error processing vote:', error);
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Ordinal Mash</title>
            </Head>
            <h1>Ordinal Mash</h1>
            {
            error ? (
                <p>{error}</p>
            ) : image1 && image2 ? (
                <div className="images-grid">
                    <div className="image-card">
                        <img src={
                                image1.path
                            }
                            alt="Image 1"/>
                        <button onClick={
                            () => handleVote(image1.id, image2.id)
                        }>
                            Vote
                        </button>
                    </div>
                    <div className="image-card">
                        <img src={
                                image2.path
                            }
                            alt="Image 2"/>
                        <button onClick={
                            () => handleVote(image2.id, image1.id)
                        }>
                            Vote
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading images...</p>
            )
        }
            <Link href="/rankings">
                View Rankings
            </Link>
            <style jsx>
                {`
            .container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 1rem;
            }
    
            h1 {
              text-align: center;
              margin-bottom: 2rem;
            }
    
            .images-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
              grid-gap: 1rem;
              justify-items: center;
            }
    
            .image-card {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 1rem;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
              border-radius: 5px;
              background-color: #ffffff;
            }
    
            .image-card img {
              width: 100%;
              height: 300px;
              object-fit: cover;
              border-radius: 5px;
              margin-bottom: 1rem;
            }
    
            .image-card button {
              font-size: 1rem;
              padding: 0.5rem 1rem;
              border: none;
              border-radius: 5px;
              background-color: #0070f3;
              color: #ffffff;
              cursor: pointer;
              transition: background-color 0.2s ease;
            }
    
            .image-card button:hover {
              background-color: #0050c8;
            }
    
            @media (max-width: 768px) {
              .images-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              }
            }
          `}</style>
        </div>
    );
}
