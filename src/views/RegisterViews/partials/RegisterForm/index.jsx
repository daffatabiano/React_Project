import { useEffect, useState } from 'react';
import './index.css';
import useAccount from '../../../../hooks/user/useAccount';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearImageUrl,
    imageUrl,
    reg,
} from '../../../../redux/slice/registerSlice';

export const Input = (prop) => {
    const { label, type, placeholder, name, disabled, isLoading, ...rest } =
        prop;
    return (
        <>
            <label htmlFor="">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                disabled={disabled === isLoading ? true : false}
                {...rest}
            />
        </>
    );
};

export const CustomButton = (prop) => {
    const { text, type = 'button' } = prop;
    return <button type={type}>{text}</button>;
};

const FirstSectionRegForm = (prop) => {
    const isDataFirstSection = useSelector((state) => state?.reg?.reg[0]);
    const {
        passwordNotice,
        setIsName,
        setIsEmail,
        setIsPassword,
        setIsPasswordRepeat,
        setIsUsername,
        setIsPhone,
    } = prop;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input
                label="Name*"
                type="text"
                placeholder="Enter Username"
                onChange={setIsName}
                defaultValue={isDataFirstSection?.name || ''}
                disabled
                required
            />
            <Input
                label="Username*"
                type="text"
                placeholder="Enter Username"
                onChange={setIsUsername}
                defaultValue={
                    isDataFirstSection?.username
                        ? isDataFirstSection?.username
                        : null
                }
                disabled
                required
            />
            <Input
                label="Email*"
                type="email"
                placeholder="example@mail.com"
                onChange={setIsEmail}
                defaultValue={
                    isDataFirstSection?.email ? isDataFirstSection?.email : null
                }
                disabled
                required
            />
            <Input
                label="Password*"
                type="password"
                placeholder="••••••••"
                onChange={setIsPassword}
                id="password"
                defaultValue={
                    isDataFirstSection?.password
                        ? isDataFirstSection?.password
                        : null
                }
                disabled
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
            />
            {passwordNotice && (
                <p
                    style={{
                        color: 'red',
                    }}
                >{`* ${passwordNotice}`}</p>
            )}
            <Input
                label="Confirm Password*"
                type="password"
                placeholder="••••••••"
                defaultValue={
                    isDataFirstSection?.passwordRepeat
                        ? isDataFirstSection?.passwordRepeat
                        : null
                }
                onChange={setIsPasswordRepeat}
                disabled
                required
            />
            <Input
                label="Phone*"
                type="number"
                placeholder="+62 8xxxxxxx"
                defaultValue={
                    isDataFirstSection?.phoneNumber
                        ? isDataFirstSection?.phoneNumber
                        : null
                }
                onChange={setIsPhone}
                disabled
                required
            />
        </div>
    );
};

const SecondSectionRegForm = (prop) => {
    const { disabled, isLoading, isFile, onChange, saveButton, clearButton } =
        prop;

    return (
        <>
            <div className="form-image">
                <p>Upload your profile picture*</p>
                <img
                    src={
                        isFile
                            ? URL.createObjectURL(isFile)
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
                    }
                    alt=""
                />
                {isFile ? (
                    <div>
                        <button
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'red',
                            }}
                            type="button"
                            onClick={clearButton}
                        >
                            Clear
                        </button>
                        <button
                            style={{
                                cursor: 'pointer',
                                marginLeft: '10px',
                                backgroundColor: 'green',
                            }}
                            type="button"
                            onClick={saveButton}
                        >
                            Save
                        </button>
                    </div>
                ) : null}
                <input
                    type="file"
                    name="profilePictureUrl"
                    onChange={onChange}
                    disabled={disabled === isLoading ? true : false}
                />
            </div>
            <Input
                label="Website"
                type="text"
                placeholder="Enter Website"
                name="website"
                disabled
            />
            <label htmlFor="bio">Bio</label>
            <textarea
                name="bio"
                id="bio"
                cols="30"
                rows="5"
                placeholder="Max 200 characters"
                disabled={disabled === isLoading ? true : false}
            />
        </>
    );
};

export default function RegisterForm(prop) {
    const [isFile, setIsFile] = useState(null);
    const { onSubmit, isLoading, passwordNotice, api } = prop;
    const [isSection, setIsSection] = useState(1);
    const { uploadImage } = useAccount();
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        username: '',
        phoneNumber: '',
    });
    const [formValid, setFormValid] = useState(false);
    const isDataFirstSection = useSelector((state) => state?.reg?.reg[0]);

    const validateForm = () => {
        const { name, email, password, passwordRepeat, username, phoneNumber } =
            formValues;
        const isValid =
            name ||
            (isDataFirstSection?.name && email) ||
            (isDataFirstSection?.email && password) ||
            (isDataFirstSection?.password && passwordRepeat) ||
            (isDataFirstSection?.passwordRepeat && username) ||
            (isDataFirstSection?.username && phoneNumber) ||
            isDataFirstSection?.phoneNumber;
        setFormValid(isValid);
    };

    const handleInputChange = (field, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    useEffect(() => {
        validateForm();
    }, [formValues]);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file.size < 1000000) {
            setIsFile(file);
        } else {
            api['error']({
                message: 'Upload Failed',
                description: 'Your file is too big, max.1mb',
            });
        }
    };

    const handleUploadImage = async () => {
        const newForm = new FormData();
        newForm.append('image', isFile);

        try {
            const res = await uploadImage(newForm);
            dispatch(imageUrl(res?.data?.url));
            if (res?.status === 200) {
                api['success']({
                    message: 'Upload Success',
                    description: 'Image uploaded',
                });
            }
        } catch (err) {
            api['error']({
                message: 'Upload Failed',
                description: err?.response?.data?.message,
            });
        }
    };

    return (
        <div className="register-form">
            <div className="register-form-header">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
            </div>
            <form onSubmit={onSubmit}>
                {isSection === 1 ? (
                    <FirstSectionRegForm
                        isLoading={isLoading}
                        passwordNotice={passwordNotice}
                        setIsName={(e) =>
                            handleInputChange('name', e.target.value)
                        }
                        setIsEmail={(e) =>
                            handleInputChange('email', e.target.value)
                        }
                        setIsPassword={(e) =>
                            handleInputChange('password', e.target.value)
                        }
                        setIsPasswordRepeat={(e) =>
                            handleInputChange('passwordRepeat', e.target.value)
                        }
                        setIsUsername={(e) =>
                            handleInputChange('username', e.target.value)
                        }
                        setIsPhone={(e) =>
                            handleInputChange('phoneNumber', e.target.value)
                        }
                    />
                ) : (
                    <SecondSectionRegForm
                        isFile={isFile}
                        disabled={isLoading}
                        onChange={handleFile}
                        saveButton={handleUploadImage}
                        clearButton={() => {
                            dispatch(clearImageUrl()) && setIsFile(null);
                            api['success']({
                                message: 'Image has been cleared',
                            });
                        }}
                    />
                )}
                {isSection === 1 ? (
                    <button
                        type="button"
                        onClick={() => {
                            if (formValid) {
                                setIsSection(2);
                                dispatch(reg(formValues));
                            } else
                                api['error']({
                                    message: 'Please fill in all the fields',
                                });
                        }}
                    >
                        Next
                    </button>
                ) : (
                    <div className="register-button">
                        <button
                            onClick={(e) =>
                                e.preventDefault() || setIsSection(1)
                            }
                        >
                            Back
                        </button>
                        <button type="submit">Submit</button>
                    </div>
                )}
            </form>
        </div>
    );
}
