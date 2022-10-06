import { useContext, useEffect, useState } from 'react';
import UserContext from '../components/UserContext';
import { 
    Card,
    Table,
    Col,
    CardHeader,
    CardFooter,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button
 } from 'reactstrap';

function AllData() {
    const [ showAllData, setShowAllData ] = useState( false );
    const context = useContext( UserContext );
    const [ allData, setAllData ] = useState( [] );
    const renderTable = ( data ) => {
        return data.map(( user, index ) => {
            const { _id, name, email, balance } = user;
            if ( name && email !== ''){
            return (
                <tr key={ _id }>
                    <th scope="row">{ name }</th>
                    <td>{ email }</td>
                    <td>{ balance }</td>
                </tr>
            )}
        })
    }
    
// use this to make a call to the database
    const handleAllData = () => {
        setShowAllData( true );
        fetch( 'http://localhost:4000/alldata' )
        .then( ( res ) => res.json() )
        .then( ( data ) => {
            // console.log('data', data)
            setAllData( data )
        });
    }
    
 
    return (
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
            <Card >

                <CardBody>
                    <CardTitle tag="h5">
                    All Data
                    </CardTitle>
                    <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                    >
                       { context.name === '' ? '' : `The current user is ${ context.name }!` }
                    </CardSubtitle>
                    <CardText>
                        All Accounts Created
                    </CardText>
                    {showAllData === false ? <Button onClick={ handleAllData }>Show All Data</Button> :
                    <Table size="sm">
                    <thead>
                        <tr>
                        <th>
                            User
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Account Balance
                        </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        { renderTable( allData ) } 
                    </tbody>
                    
                </Table>
            }
                </CardBody>

        </Card> 
    </Col>
    )
}

export default AllData;