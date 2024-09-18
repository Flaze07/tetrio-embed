import type { NextRequest } from "next/server";
import Image from 'next/image';
import { ImageResponse } from "next/og";
import bg from '@/app/resource/background.png';

export const runtime = 'edge';

// const errorImage = new ImageResponse(
//     (
//         <div
//                 style={{
//                     // fontFamily: ''
//                     fontSize: 128,
//                     background: 'white',
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     paddingLeft: '100px',
//                     backgroundColor: '#363636',
//                     color: 'lightgray',
//                 }}
//             >
//                 <span>
//                     Error Happened, don't know why
//                 </span>
//             </div>
//     )
// );

function convertMilliseconds(ms: number): string {
    const minutes = Math.floor(ms / 60000); // 1 minute = 60,000 milliseconds
    const seconds = Math.floor((ms % 60000) / 1000); // Remainder after minutes conversion
  
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Add leading zero for seconds if needed
}

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
    const { name } = params;

    const resp = await fetch(`https://ch.tetr.io/api/users/${name}`);
    const data: any = await resp.json();

    if(data.success === false) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 64,
                        background: 'white',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: '100px',
                        // backgroundImage: `url(https://ik.imagekit.io/flaze002111/background.png)`,
                        // backgroundRepeat: 'repeat',
                        backgroundColor: '#363636',
                        color: 'lightgray',
                        // textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff'
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <span
                            style={{
                                fontSize: 128,
                                fontWeight: 'bold',
                            }}
                        >
                            Goblok
                        </span>
                        <span>
                            Gak ada user dengan nama ini tolol
                        </span>
                    </span>
                    <span
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'flex-end',
                            marginLeft: '100px'
                        }}
                    >
                        <img 
                            src="https://ik.imagekit.io/flaze002111/crazy.png"
                            style={{
                                width: '500px',
                            }}
                        />
                    </span>
                </div>
            ),
            {
                width: 1800,
                height: 600
            }
        )
    }

    const avatarSource: string = await (async () => {
        const temp = `https://tetr.io/user-content/avatars/${data.data._id}.jpg?rv=${data.data.avatar_revision}`
        const checkImage = await fetch(temp);
        if(checkImage.status !== 200) {
            return "https://tetr.io/res/avatar.png";
        }

        return temp;
    })();

    const userSummaryResp = await fetch(`https://ch.tetr.io/api/users/${name}/summaries`);
    const userSummaryData: any = await userSummaryResp.json();
    // console.log(userSummaryData.data.league.rank);

    const result40L: string = userSummaryData.data['40l'].record === null ? 'N/A' : convertMilliseconds(userSummaryData.data['40l'].record.results.stats.finaltime);
    const resultBlitz: string = userSummaryData.data.blitz.record === null ? 'N/A' : userSummaryData.data.blitz.record.results.stats.score;

    return new ImageResponse(
        (
            <div
                style={{
                    // fontFamily: ''
                    fontSize: 68,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: '100px',
                    backgroundColor: '#363636',
                    color: 'lightgray',
                }}
            >
                <img 
                    src={avatarSource} 
                    style={{
                        width: '300px'
                    }}
                />
                <span
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '70%',
                        marginLeft: '50px',
                        marginTop: '70px',
                        // justifyContent: 'center'
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // backgroundColor: 'blue',
                        }}
                    >
                        <span
                            style={{
                                fontSize: 100,
                                fontWeight: 'bold',
                            }}
                        >
                            {name}
                        </span>
                        <img 
                            src={`https://tetr.io/res/league-ranks/${userSummaryData.data.league.rank}.png`} 
                            style={{
                                width: '150px',
                                display: 'block',
                                marginLeft: '40px',
                                // backgroundColor: 'red'
                            }}
                        />
                    </span>
                    <span
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '20px',
                        }}
                        >
                        <span
                            style={{
                                color: 'black',
                                backgroundColor: '#64ABED',
                                boxShadow: 'inset 0px 0px 3.4px 5px rgba(0, 0, 0, 0.25)',
                                padding: '5px 20px',
                                borderRadius: '20px'
                            }}
                        >
                            40L: {result40L}
                        </span>
                        <span
                            style={{
                                color: 'black',
                                backgroundColor: '#DDEE73',
                                boxShadow: 'inset 0px 0px 3.4px 5px rgba(0, 0, 0, 0.25)',
                                padding: '5px 20px',
                                borderRadius: '20px',
                                marginLeft: '40px'
                            }}
                        >
                            Blitz: {resultBlitz}
                        </span>
                    </span>
                </span>
            </div>
        ),
        {
            width: 1800,
            height: 600
        }
    );
}