import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import bg from '@/app/resource/background.png';

export const runtime = 'edge';

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

    const avatarSource: string = `https://tetr.io/user-content/avatars/${data.data._id}.jpg?rv=${data.data.avatar_revision}`;

    const userSummaryResp = await fetch(`https://ch.tetr.io/api/users/${name}/summaries`);
    const userSummaryData: any = await userSummaryResp.json();
    // console.log(userSummaryData.data.league.rank);

    return new ImageResponse(
        (
            <div
                style={{
                    // fontFamily: ''
                    fontSize: 48,
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
                        alignItems: 'flex-start',
                        marginLeft: '50px'
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                        }}
                    >
                        <p
                            style={{
                                fontSize: 100,
                                fontWeight: 'bold',
                            }}
                        >
                            {name}
                        </p>
                        <img 
                            src={`https://tetr.io/res/league-ranks/${userSummaryData.data.league.rank}.png`} 
                            style={{
                                width: '150px',
                                marginTop: '40px',
                                marginLeft: '40px'
                            }}
                        />
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