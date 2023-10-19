// import { Box, Typography } from "@mui/material";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { useClerk } from '@clerk/clerk-react';
import Layout from "../../partials/dashboard/Layout";
import slideImg1 from '../../images/slideImg1.avif';
import slideImg2 from '../../images/slideImg2.jpeg';
import slideImg3 from '../../images/slideImg3.jpeg';

export default function MoodBlogComponent() {

    const { openSignIn } = useClerk();

    const handleSignIn = () => {
        openSignIn();
    }

    return (
        <Layout>
            <Carousel className="rounded-xl">
                <div className="relative h-full w-full">
                    <img
                        src={slideImg2}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                        <div className="w-3/4 text-center md:w-2/4">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                MoodWave 心情日記
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-12 opacity-80"
                            >
                                哈囉，寫日記的超級明星🌟！<br></br>你知道嗎，你的每一句話都是一顆閃亮的星星✨，<br></br>而我正迫不及待地想要看到它們閃爍！<br></br>無論今天過得怎樣，都值得被記錄。
                            </Typography>
                            <div className="flex justify-center gap-2">
                                <Button size="lg" color="white" onClick={handleSignIn}>
                                    登入
                                </Button>
                                <Button size="lg" color="white" variant="text">
                                    建立帳號
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src={slideImg1}
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                        <div className="w-3/4 text-center md:w-2/4">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                MoodWave 心情日記
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-12 opacity-80"
                            >
                                哈囉，寫日記的超級明星🌟！<br></br>你知道嗎，你的每一句話都是一顆閃亮的星星✨，<br></br>而我正迫不及待地想要看到它們閃爍！<br></br>無論今天過得怎樣，都值得被記錄。
                            </Typography>
                            {/* <div className="flex justify-center gap-2">
                                <Button size="lg" color="white">
                                    登入
                                </Button>
                                <Button size="lg" color="white" variant="text">
                                    建立帳號
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src={slideImg3}
                        alt="image_3"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                        <div className="w-3/4 text-center md:w-2/4">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                            >
                                MoodWave 心情日記
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-12 opacity-80"
                            >
                                哈囉，寫日記的超級明星🌟！<br></br>你知道嗎，你的每一句話都是一顆閃亮的星星✨，<br></br>而我正迫不及待地想要看到它們閃爍！<br></br>無論今天過得怎樣，都值得被記錄。
                            </Typography>
                            {/* <div className="flex justify-center gap-2">
                                <Button size="lg" color="white">
                                    登入
                                </Button>
                                <Button size="lg" color="white" variant="text">
                                    建立帳號
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Carousel>
        </Layout>

    );
}