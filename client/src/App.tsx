import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {ImageProvider} from "./context/ImageProvider.tsx";

function App() {

    return (
        <>
            <ImageProvider>
                <MainPage/>
            </ImageProvider>
        </>
    )
}

export default App
