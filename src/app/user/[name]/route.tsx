import type { NextRequest } from "next/server";
import { Inter } from 'next/font/google';
import { ImageResponse } from "next/og";
import bg from '@/app/resource/background.png';

export const runtime = 'edge';
const inter = Inter({ subsets: ['latin'] })

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
    const imageSize = {
        width: 885,
        height: 698
    }
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

    //40L
    const result40L: string = userSummaryData.data['40l'].record === null ? 'N/A' : convertMilliseconds(userSummaryData.data['40l'].record.results.stats.finaltime);
    const rankLocal40L: string = userSummaryData.data['40l'] === null ? 'N/A': userSummaryData.data['40l'].rank_local;
    const rank40L: string = userSummaryData.data['40l'] === null ? 'N/A': userSummaryData.data['40l'].rank;

    //blitz
    const resultBlitz: string = userSummaryData.data.blitz.record === null ? 'N/A' : userSummaryData.data.blitz.record.results.stats.score;
    const rankLocalBlitz: string = userSummaryData.data.blitz === null ? 'N/A': userSummaryData.data.blitz.rank_local;
    const rankBlitz: string = userSummaryData.data.blitz === null ? 'N/A': userSummaryData.data.blitz.rank

    //League
    const resultLeague: string = userSummaryData.data.league.record === null ? 'N/A' : userSummaryData.data.league.tr;
    const rankLocalLeague: string = userSummaryData.data.league === null ? 'N/A': userSummaryData.data.league.standing_local;
    const rankLeague: string = userSummaryData.data.league === null ? 'N/A': userSummaryData.data.league.standing;
    const rankIconLeague: string = userSummaryData.data.league === null ? 'N/A': userSummaryData.data.league.rank;

    return new ImageResponse(
        (
            <div
                // className={inter.className}
                style={{
                    // fontFamily: 'Helvetica',
                    fontSize: 68,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#E5D9F2',
                    color: 'lightgray',
                    border: "9px solid #060606",
                    boxShadow: "inset 0px 0px 8.5px 21px rgba(0, 0, 0, 0.25)",
                    paddingTop: "47px",
                    paddingLeft: '37px',
                    // paddingRight: '300px',
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '25px',
                        marginRight: '300px'
                    }}
                >
                    <img 
                        src={`${avatarSource}`} 
                        style={{
                            width: '215px',
                            borderRadius: '90px',
                            boxShadow: '5px 6px 6px 3px rgba(0, 0, 0, 0.25)'
                        }}
                    />
                    <span
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            fontSize: 40,
                            color: '#000'
                        }}
                    >
                        <span
                        >
                            {name}
                        </span>
                        <span
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flex: 1,
                                width: '100%',
                                boxShadow: '5px 6px 4px rgba(0, 0, 0, 0.25)',
                                border: '4px solid #000000',
                                borderRadius: '20px',
                                backgroundColor: '#CDC1FF',
                                paddingLeft: '28px',
                            }}
                            >
                            <span
                                style={{
                                    paddingTop: '23px',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <span
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        fontSize: 20,
                                        gap: '13px'
                                    }}
                                >
                                    <span
                                        style={{
                                            backgroundColor: ' #A594F9',
                                            border: '3px solid #000000',
                                            borderRadius: '20px',
                                            padding: '8px 4px'
                                        }}
                                    >
                                        Country#{rankLocalLeague}
                                    </span>
                                    <span
                                        style={{
                                            backgroundColor: ' #A594F9',
                                            border: '3px solid #000000',
                                            borderRadius: '20px',
                                            padding: '8px 4px'
                                        }}
                                    >
                                        Global#{rankLeague}
                                    </span>
                                </span>
                                <span
                                    style={{
                                        fontSize: 48
                                    }}
                                >
                                    {Math.floor(Number.parseFloat(resultLeague))} TR
                                </span>
                            </span>
                            <span
                                style={{
                                    flex: 1
                                }}
                            >

                            </span>
                            <span>
                                <img
                                    src={`https://tetr.io/res/league-ranks/${rankIconLeague}.png`}
                                    style={{
                                        // alignSelf: 'flex-end',
                                        width: '159px',
                                        // height: '200px',
                                        borderRadius: '20px',
                                        // boxShadow: '5px 6px 6px 3px rgba(0, 0, 0, 0.25)'
                                        
                                    }}
                                />
                            </span>
                        </span>
                    </span>
                </span>
                <span
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '141px',
                        marginTop: '22px',
                        marginRight: '55px',
                        gap: '14px',
                        color: '#000',
                    }}
                >
                    {/* For 40L */}
                    <span
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            backgroundColor: '#CDC1FF',
                            border: '4px solid #000000',
                            boxShadow: '5px 6px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '20px',
                            paddingTop: '12px',
                            paddingLeft: '20px'
                        }}
                    >
                        <span
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                fontSize: 20,
                                gap: '13px',
                            }}
                        >
                            <span
                                style={{
                                    backgroundColor: ' #A594F9',
                                    border: '3px solid #000000',
                                    borderRadius: '20px',
                                    padding: '8px 4px'
                                }}
                            >
                                Country#{rankLocal40L}
                            </span>
                            <span
                                style={{
                                    backgroundColor: ' #A594F9',
                                    border: '3px solid #000000',
                                    borderRadius: '20px',
                                    padding: '8px 4px'
                                }}
                            >
                                Country#{rank40L}
                            </span>
                        </span>
                        <span>
                            <span
                                style={{
                                    fontSize: 48
                                }}
                            >
                                {result40L}
                            </span>
                        </span>
                    </span>
                    {/* For Blitz */}
                    <span
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            backgroundColor: '#CDC1FF',
                            border: '4px solid #000000',
                            boxShadow: '5px 6px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '20px',
                            paddingTop: '12px',
                            paddingLeft: '20px'
                        }}
                    >
                        <span
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                fontSize: 20,
                                gap: '13px',
                            }}
                        >
                            <span
                                style={{
                                    backgroundColor: ' #A594F9',
                                    border: '3px solid #000000',
                                    borderRadius: '20px',
                                    padding: '8px 4px'
                                }}
                            >
                                Country#{rankLocalBlitz}
                            </span>
                            <span
                                style={{
                                    backgroundColor: ' #A594F9',
                                    border: '3px solid #000000',
                                    borderRadius: '20px',
                                    padding: '8px 4px'
                                }}
                            >
                                Country#{rankBlitz}
                            </span>
                        </span>
                        <span>
                            <span
                                style={{
                                    fontSize: 48
                                }}
                            >
                                {resultBlitz}
                            </span>
                        </span>
                    </span>
                </span>
            </div>
        ),
        imageSize,
    );
}