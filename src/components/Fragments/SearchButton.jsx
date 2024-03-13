import Button from '../Elements/Button';
import Input from '../Elements/Input/Input';
import MySvgComponent from '../Elements/MySvgComponent';

const SearchButton = () => {
    return (
        <div className="search">
            <form className="d-flex" role="search">
                <Input
                    classname="form-control rounded-pill"
                    type="search"
                    placeholder="Search"
                    label="Search"
                />
                <Button classname="button search rounded-circle m-auto">
                    <MySvgComponent icon="bi bi-search" width="23" height="20">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </MySvgComponent>
                </Button>
            </form>
        </div>
    );
};

export default SearchButton;
