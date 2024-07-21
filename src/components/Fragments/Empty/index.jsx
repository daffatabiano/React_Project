import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { IMAGE_UNDER_CONSTRUCTION } from '../../../hooks/service/services';

export default function UnderConstructions() {
    const { md } = useBreakpoint();
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: md ? '0 0 0 24%' : '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <div style={{ width: md ? 500 : 300, height: md ? 500 : 300 }}>
                <img
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    src={IMAGE_UNDER_CONSTRUCTION}
                    alt=""
                />
            </div>
            <h1>UNDER CONSTRUCTION</h1>
        </div>
    );
}
