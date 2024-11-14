import React, { useState } from 'react';
import { Button, Form, Card, Col, Row, Container } from 'react-bootstrap';
<<<<<<< HEAD
=======
import axios from 'axios';
>>>>>>> c92ab21b (modified backend part)

const ProductCreation = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
<<<<<<< HEAD
    const [image, setImage] = useState(null);
    const [cars, setCars] = useState([
        { id: 1, title: 'Tesla Model S', imageUrl: 'https://via.placeholder.com/400x250', description: 'Electric sedan with autopilot.' },
        { id: 2, title: 'Ford Mustang', imageUrl: 'https://via.placeholder.com/400x250', description: 'Classic muscle car with a powerful engine.' },
        { id: 3, title: 'Toyota Supra', imageUrl: 'https://via.placeholder.com/400x250', description: 'Sports car known for its speed.' },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCar = { id: Date.now(), title, description, imageUrl: image };
        setCars([...cars, newCar]);
        setTitle('');
        setDescription('');
        setImage(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
=======
    const [image, setImage] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            description: description,
            image: image
        }
        console.log(formData)

        try {
            const response = await axios.post('http://localhost:4000/api/v1/carpost/cars', formData, {
                withCredentials: true,
            });

            // Handle success response from the server
            console.log('Car created successfully:', response.data);

            // Clear form fields after successful submission
            setTitle('');
            setDescription('');
            setImage(null);
        } catch (err) {
            // Handle error if the post request fails
            console.error('Error creating car:', err);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the file object
        console.log(URL.createObjectURL(file))
        if (file) {
            // Append the file to the images array
            setImage((prevImages) => [...prevImages, URL.createObjectURL(file)]);
>>>>>>> c92ab21b (modified backend part)
        }
    };

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">Create New Car</h1>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="p-4 shadow-sm">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="mb-3"
                                />
                                {image && (
                                    <img
                                        src={image}
                                        alt="Preview"
                                        className="img-fluid rounded mb-3"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Car Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter car title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Write a description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>

<<<<<<< HEAD
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100"
                            >
=======
                            <Button type="submit" variant="primary" className="w-100">
>>>>>>> c92ab21b (modified backend part)
                                Create Car
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductCreation;
