import { useState, useMemo } from "react";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from 'react-router-dom'
import ReactSelect from "react-select"
import { Tag } from "./App";



type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}


export function NoteList({availableTags, notes }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")

    const filteredNotes = useMemo (() => {
        return notes.filter(note => {
            //if title is still empty or doesnt match don't do anything
            return (title === "" || note.title.toLowerCase().includes(title.toLocaleLowerCase())) 
            //makes sure that all of the tags match the tag name we enter in the search bar
            && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)));
        })
    }, [title, selectedTags, notes])

    return(
        <>
        <Row classNmae="align-items-center mb-4">
            <Col><h1>Notes</h1></Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                        <Button variant="primary">Create</Button>
                    </Link>
                    <Button variant="outline-secondary">Edit Tags</Button>
                </Stack>
            </Col>
        </Row>
        <Form>
            <Row className="mb-4">
                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>  
                    <Form.Control type = "text" value={title} 
                    onChange={e => setTitle(e.target.value)}/>
                </Form.Group></Col>
                <Col>
                    <Form.Group controlId='title'>
                            <Form.Label>Tag</Form.Label>
                            <ReactSelect 
                            value={selectedTags.map(tag => {
                                return {label: tag.label, value: tag.id}
                            })} 
                            options={availableTags.map(tag => {
                                return { label: tag.label, value: tag.id}
                            })}
                            onChange={tags => {
                                setSelectedTags(tags.map(tag => {
                                    return {label: tag.label, id: tag.value }
                                }))
                            }}
                            isMulti 
                            />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} classnAME="g-3">
            {filteredNotes.map(note => (
                <Col key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags} />
                </Col>
            ))}

        </Row>
        </>
    )
}

function NoteCard({id, title, tags}: SimplifiedNote) {
    const cardStyle = {
        transition: 'translate ease-in-out 100ms, box-shadow ease-in-out 100ms',
        textDecoration: 'none',
    }
    // const cardHoverStyle = {
    //     translate: '0, -5px',
    //     boxShadow: '0 5px 8 px 0 rbga(0, 0, 0, .2)'
    // }
    return <Card as={Link} to={`/${id}`} style={cardStyle}>

    </Card> 
}