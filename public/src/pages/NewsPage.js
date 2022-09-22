import NewsSearch from '../components/NewsAPI';
import { Card, CardHeader, CardBody, CardSubtitle } from 'reactstrap';

const NewsPage = () => {
    return (
        <Card>
            <CardHeader>
                Current Financial News
            </CardHeader>
            <CardSubtitle                 
            className="mb-2 text-muted"
            tag="h6"
            id="newsSubtitle">
                Brought to you by Bing News Search API
            </CardSubtitle>
            <CardBody>
                <NewsSearch />
            </CardBody>
        </Card>
    )
}

export default NewsPage;