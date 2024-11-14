import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
<<<<<<< HEAD

// Dummy Data
const dummyCars = [
    { id: 1, title: 'Tesla Model S', imageUrl: 'https://via.placeholder.com/400x250', description: 'Electric sedan with autopilot.' },
    { id: 2, title: 'Ford Mustang', imageUrl: 'https://via.placeholder.com/400x250', description: 'Classic muscle car with a powerful engine.' },
    { id: 3, title: 'Toyota Supra', imageUrl: 'https://via.placeholder.com/400x250', description: 'Sports car known for its speed.' },
];
=======
import axios from 'axios';
>>>>>>> c92ab21b (modified backend part)

const ProductDetail = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate(); // Hook to navigate between routes
    const [car, setCar] = useState(null);
<<<<<<< HEAD

    useEffect(() => {
        // Find the car based on the ID from the URL
        const selectedCar = dummyCars.find(car => car.id === parseInt(id));
        setCar(selectedCar);
    }, [id]);

    const handleDelete = () => {
        // Logic to delete the car
        console.log(`Car with ID ${car.id} deleted`);
        navigate('/'); // Redirect to the home page after deletion
    };

    const handleEdit = () => {
        // Logic to edit the car
        console.log(`Car with ID ${car.id} edited`);
        navigate(`/edit/${car.id}`); // Redirect to the edit page
    };

    if (!car) {
        return <div>Loading...</div>;
    }

=======
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        const fetchCarDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/carpost/cars/${id}`,{ withCredentials: true});
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
            await axios.delete(`http://localhost:4000/api/v1/carpost/cars/${car._id}`,{
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

>>>>>>> c92ab21b (modified backend part)
    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Car Details</h1>
            <Card className="shadow-lg rounded-lg">
                <Card.Img variant="top" src={car.imageUrl} alt={car.title} className="img-fluid" />
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
