import { Skeleton } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export default function SkeletonHomeViews() {
    const { md } = useBreakpoint();
    return (
        <div className="skeleton">
            <Skeleton
                avatar
                active
                size="large"
                block
                shape="circle"
                paragraph={{ rows: 0 }}
                style={{
                    padding: '20px',
                    backgroundColor: 'var(--skeleton)',
                    borderRadius: '20px',
                }}
            />
            <Skeleton.Image
                active
                style={{
                    width: md ? '600px' : '300px',
                    height: md ? '600px' : '300px',
                    margin: '15px auto',
                    backgroundColor: 'var(--skeleton)',
                    borderRadius: '20px',
                }}
            />
            <Skeleton
                active
                paragraph={{ rows: 3 }}
                style={{
                    borderRadius: '20px',
                    padding: '20px',
                    width: md ? '600px' : '300px',
                    backgroundColor: 'var(--skeleton)',
                }}
            />
        </div>
    );
}
