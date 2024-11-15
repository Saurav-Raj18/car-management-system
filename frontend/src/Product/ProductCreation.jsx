import React, { useState } from 'react';
import { Button, Form, Card, Col, Row, Container } from 'react-bootstrap';
import axiosInstance from '../config/axiosConfig';

const ProductCreation = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            description: description,
            image:image
        }
        console.log(formData)

        try {
            const response = await axiosInstance.post('api/v1/carpost/cars',formData, {
                withCredentials: true,
            });

            // Handle success response from the serve
            console.log('Car created successfully:', response.data);
           // image
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

                            <Button type="submit" variant="primary" className="w-100">
                                Create Car
                            </Button>
                        </Form>m
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductCreation;
