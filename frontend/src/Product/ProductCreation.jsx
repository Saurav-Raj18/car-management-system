import React, { useState } from 'react';
import { Button, Form, Card, Col, Row, Container } from 'react-bootstrap';
import axios from 'axios';

const ProductCreation = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]); // Use plural name 'images' for multiple files

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        // Append each image file correctly (assuming `images` is an array of files)
        images.forEach((file) => {
            formData.append('image', file);  // 'image' is the field name that multer expects
        });
        console.log(images)

        try {
            const response = await axios.post('http://car-management-system-7w9u.vercel.app/api/v1/carpost/cars', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success response from the server
            console.log('Car created successfully:', response.data);

            // Clear form fields after successful submission
            setTitle('');
            setDescription('');
            setImages([]); // Reset images after submission
        } catch (err) {
            // Handle error if the post request fails
            console.error('Error creating car:', err);
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array
        setImages(files); // Update the images state with the selected files
    };

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">Create New Car</h1>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="p-4 shadow-sm">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Upload Image(s)</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    multiple // Allow selecting multiple files
                                    onChange={handleImageUpload}
                                    className="mb-3"
                                />

                                {/* Render previews of selected images */}
                                {images.length > 0 && (
                                    <div className="image-previews">
                                        {images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(image)}
                                                alt={`Preview ${index + 1}`}
                                                className="img-fluid rounded mb-3"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                        ))}
                                    </div>
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
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductCreation;
