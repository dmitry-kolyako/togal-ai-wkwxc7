import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {ApiConfig} from "../../shared/config/api.config.ts";

import {ImageProvider} from "./context";
import {ApiServiceV1} from "./services";
import {Body, LoadingOverlay} from "./components";
import {ErrorSemaphore} from "./components/ErrorSemaphore/ErrorSemaphore.tsx";

const api = ApiServiceV1.getInstance(ApiConfig);

function App() {

    return (
        <Body>
            <ImageProvider ApiService={api}>
                <MainPage/>
                <LoadingOverlay/>
                <ErrorSemaphore/>
            </ImageProvider>
        </Body>
    )
}

export default App
