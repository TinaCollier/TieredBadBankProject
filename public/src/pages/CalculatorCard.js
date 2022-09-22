import { 
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Col,
    CardHeader
 } from 'reactstrap';
 import Calculator from '../components/Calculator';

function CalculatorCard() {
    return (
        <Col sm="12" md={{ size: 6, offset: 3 }} className="calculatorcard">
            <Card >
                <CardBody>
                    <CardHeader>
                        <CardTitle>
                        Calculator
                        </CardTitle>
                        <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                        >
                            Bad Bank
                        </CardSubtitle>
                    </CardHeader>
                    <CardBody>
                        <Calculator />
                    </CardBody>
                </CardBody>
        </Card> 
    </Col>
    )
}

export default CalculatorCard;