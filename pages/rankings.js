import {useState, useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function Rankings() {
    const [topImages, setTopImages] = useState([]);
    const [bottomImages, setBottomImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await axios.get('/api/rankings');
            setTopImages(res.data.topImages);
            setBottomImages(res.data.bottomImages);
        } catch (error) {
            console.error('Error fetching rankings:', error);
            setError(`Error fetching rankings: ${
                error.message
            }`);
        }
    };

    return (
        <div className="container">
            <Head>
                <title>Rankings</title>
            </Head>
            <h1>Rankings</h1>
            {
            error ? (
                <p>{error}</p>
            ) : (
                <>
                    <h2>Top 5</h2>
                    <div className="images-grid">
                        {
                        topImages.map((image) => (
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
                                <p>Elo: {
                                    image.elo
                                }</p>
                            </div>
                        ))
                    } </div>
                    <h2>Bottom 5</h2>
                    <div className="images-grid">
                        {
                        bottomImages.map((image) => (
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
                                <p>Elo: {
                                    image.elo
                                }</p>
                            </div>
                        ))
                    } </div>
                </>
            )
        }
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

        h2 {
          margin-bottom: 1rem;
        }

        .images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
          object-fit: cover;
          border-radius: 5px;
        }

        .image-card p {
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .images-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }
      `}</style>
        </div>
    );
}
