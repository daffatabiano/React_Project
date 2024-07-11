import { Skeleton } from 'antd';

export default function SkeletonHomeViews() {
    return (
        <div
            style={{
                padding: '20px',
            }}
        >
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
                    width: '600px',
                    height: '600px',
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
                    width: '600px',
                    backgroundColor: 'var(--skeleton)',
                }}
            />
        </div>
    );
}
