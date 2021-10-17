import { MovieEventCard, MovieImage, TextData } from "./styledComponents";

type Props = {
    image: string;
    title: string;
    location: string;
    datetime: string;
}

export default function MovieEvent(props: Props){
    return(
        <MovieEventCard>
            <MovieImage src={props.image}/>
            <TextData>
                <h3>{props.title}</h3>
                <div>{props.location}</div>
                <div>{props.datetime}</div>
            </TextData>
        </MovieEventCard>
    )
}