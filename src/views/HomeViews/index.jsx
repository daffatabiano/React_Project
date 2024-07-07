import BaseLayout from '../../components/Layout/Headers/BaseLayout';
import StoryUpdated from '../../components/Fragments/StoryUpdated';
import Postcard from '../../components/Fragments/Cards';

export default function HomeViews() {
    return (
        <BaseLayout>
            <StoryUpdated />
            <Postcard />
        </BaseLayout>
    );
}
