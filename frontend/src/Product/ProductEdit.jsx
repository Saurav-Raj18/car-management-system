import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import axiosInstance from '../config/axiosConfig';

const EditProduct = () => {
    const { id } = useParams(); // Get the car ID from the URL
    const navigate = useNavigate(); // Hook to navigate between routes
    const [car, setCar] = useState({
        title: '',
        imageUrl: [],
        description: ''
    });
    const [, setImage] = useState([])
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Store the selected ile
        }
    };

    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling

    // Fetch the car details when the component mounts
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axiosInstance.get(`api/v1/carpost/cars/${id}`,{ withCredentials: true});
                setCar(response.data); // Set the car data
                setLoading(false);
            } catch (err) {
                setError('Error fetching car details');
                setLoading(false);
            }
        };
        fetchCarDetails();
    }, [id]);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prevCar) => ({
            ...prevCar,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`api/v1/carpost/cars/${id}`, car, { withCredentials: true});
            console.log('Car updated successfully:', response.data);
            navigate(`/product/${id}`); // Redirect to the product details page after edit
        } catch (err) {
            setError('Error updating car details');
            console.log(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Edit Car Details</h1>
            <Card className="shadow-lg rounded-lg">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={car.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="imageUrl" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <div>
                                <img
                                    src={car.imageUrl}
                                    alt="Current Car"
                                    style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
                                />
                            </div>
                            <Form.Control
                                type="file"
                                name="imageUrl"
                                onChange={handleImageChange}
                            />
                            <small className="form-text text-muted">Leave empty if you don't want to change the image.</small>
                        </Form.Group>

                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={car.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update Car
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EditProduct;
