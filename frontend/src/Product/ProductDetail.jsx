import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axiosInstance from '../config/axiosConfig';


const ProductDetail = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate(); // Hook to navigate between routes
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        const fetchCarDetail = async () => {
            try {
                const response = await axiosInstance.get(`api/v1/carpost/cars/${id}`,{ withCredentials: true});
                console.log(response.data)
                setCar(response.data); // Set the car data from the response
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setError('Error fetching car details');
                setLoading(false);
            }
        };

        fetchCarDetail();
    }, [id]);

    const handleDelete = async () => {
        try {
            // Logic to delete the car (make an API request to delete the car)
            await axiosInstance.delete(`api/v1/carpost/cars/${car._id}`,{
                withCredentials:true
            });
            console.log(`Car with ID ${car._id} deleted`);
            navigate('/home'); // Redirect to the home page after deletion
        } catch (err) {
            console.log('Error deleting car:', err);
        }
    };

    const handleEdit = () => {
        // Redirect to the edit page
        console.log(`Car with ID ${car._id} edited`);
        navigate(`/edit/${car._id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Car Details</h1>
            <Card className="shadow-lg rounded-lg">
                <Card.Img variant="top" src={car.image} alt={car.title} className="img-fluid" />
                <Card.Body>
                    <Card.Title>{car.title}</Card.Title>
                    <Card.Text>{car.description}</Card.Text>

                    <div className="d-flex justify-content-end">
                        <Button variant="warning" className="me-3" onClick={handleEdit}>
                            Edit
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProductDetail;
