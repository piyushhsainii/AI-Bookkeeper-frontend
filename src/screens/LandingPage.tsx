import HomeScreen from "../components/HomeScreen"
import Navbar from "../components/Navbar"
import Transactions from "../components/Transactions"

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <HomeScreen />
            <Transactions />
        </>
    )
}

export default LandingPage