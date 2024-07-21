import { Col, Row } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import SkeletonImage from 'antd/es/skeleton/Image';

export default function ExploreViewsSkeleton() {
    const { md } = useBreakpoint();

    const SkeletonCol = () => {
        return (
            <Col span={24}>
                <SkeletonImage
                    style={{
                        width: md ? 300 : 210,
                        height: md ? 300 : 210,
                        marginRight: md ? 15 : 5,
                    }}
                />
                <SkeletonImage
                    style={{
                        width: md ? 300 : 210,
                        height: md ? 300 : 210,
                        marginRight: md ? 15 : 5,
                    }}
                />
                <SkeletonImage
                    style={{
                        width: md ? 300 : 210,
                        height: md ? 300 : 210,
                        marginRight: md ? 15 : 5,
                    }}
                />
            </Col>
        );
    };

    return (
        <Row gutter={[8, 16]} justify="center" align="middle">
            <SkeletonCol />
            <SkeletonCol />
            <SkeletonCol />
        </Row>
    );
}
