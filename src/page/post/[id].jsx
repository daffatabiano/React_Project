import { useParams } from 'react-router-dom';

function EditPost() {
    const params = useParams();
    console.log(params);
}

export default EditPost;
