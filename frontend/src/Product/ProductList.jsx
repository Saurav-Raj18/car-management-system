import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Form, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

const ProductList = () => {
    // Move useNavigate to the top of the component
    const navigate = useNavigate();
    const viewDetails = (carId) => {
        navigate(`/product/${carId}`);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchCars = async () => {
            axiosInstance.get('api/v1/carpost/cars', {
                withCredentials: true
            }).then((response) => {
                setCars(response.data);
            }).catch((error) => {
                console.error('Error fetching cars:', error);
            }).finally(() => {
                setLoading(false);

            })

        };

        fetchCars();
    }, []);

    

    const filteredCars = cars.filter(car =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );



    if (loading) return <p>Loading cars...</p>;

    return (
        <Container className="py-5">
            <h1 className="text-center mb-4">My Clars</h1>

            <div className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="shadow-sm"
                />
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
                {filteredCars.map((car) => (
                    <Col key={car._id}>
                        <Card className="shadow-sm rounded-lg">
                            <Card.Img
                                variant="top"
                                src={car.image[0]}
                                alt={car.title}
                                className="img-fluid"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {car.title}
                                </Card.Title>

                                <Card.Text>
                                    {car.description.length > 100
                                        ? `${car.description.substring(0, 100)}...`
                                        : car.description
                                    }
                                    {car.description.length > 100 && (
                                        <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => alert('Show full description')}>
                                            Read more
                                        </span>
                                    )}
                                </Card.Text>

                                <Button
                                    variant="primary"
                                    onClick={() => viewDetails(car._id)}
                                    className="w-100">
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
