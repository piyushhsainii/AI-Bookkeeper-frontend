import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Typewriter } from 'react-simple-typewriter';

const Loader = () => {
    return (
        <div className='flex flex-col md:flex-row  items-center'>
            <div>
                <DotLottieReact
                    src="https://lottie.host/b2cda178-b82d-472b-8b9c-a908fc3651d3/iwaxjyJhvT.lottie"
                    loop
                    className='w-[22rem] h-[22rem]'
                    autoplay
                />
            </div>
            <div>
                <span className='text-themePrimary bg-themeTertiary p-2 font-bold text-3xl' >
                    <Typewriter
                        typeSpeed={80}
                        words={[
                            `Categorizing your Data`,
                            'Thank you for your patience',
                            'Welcome to AI Book Keeper'
                        ]}
                        loop={false} />
                </span>
            </div>
        </div>
    )
}

export default Loader