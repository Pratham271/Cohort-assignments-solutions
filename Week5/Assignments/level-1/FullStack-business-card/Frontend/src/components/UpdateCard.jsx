import React, { useState } from 'react';

const UpdateCard = ({ cardUpdate, setCardUpdate, setUpdate }) => {
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        if (name === 'interests') {
            const newInterests = [...cardUpdate.interests];
            newInterests[index] = value;
            setCardUpdate({ ...cardUpdate, interests: newInterests });
        } else if (name === 'linksName' || name === 'linksUrl') {
            const newLinks = [...cardUpdate.links];
            newLinks[index][name === 'linksName' ? 'name' : 'url'] = value;
            setCardUpdate({ ...cardUpdate, links: newLinks });
        } else {
            setCardUpdate({ ...cardUpdate, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent form submission
        const res = await fetch("http://localhost:3000/card", {
                    method: "PUT",
                    body: JSON.stringify({
                      title: cardUpdate.title,
                      description: cardUpdate.description,
                      interests: cardUpdate.interests,
                      links: cardUpdate.links
                    }),
                    headers: {
                      "Content-type": "application/json",
                      "id": cardUpdate._id
                    }
                  
        })
        const data = await res.json()
        alert(data.message)
        setUpdate(false)


    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={cardUpdate.title} onChange={(e) => handleChange(null, e)} required />
            <br />
            <label>Description:</label>
            <input type="text" name="description" value={cardUpdate.description} onChange={(e) => handleChange(null, e)} required />

                <br />
                <label>Interests:</label>
                {cardUpdate.interests.map((interest, index) => (
                    <div key={index}>
                        <input type="text" name="interests" value={interest} onChange={(e) => handleChange(index, e)} required />
                    </div>
                ))}
                <br />
                <label>Links:</label>
                {cardUpdate.links.map((link, index) => (
                    <div key={index}>
                        <input type="text" name="linksName" placeholder="Name" value={link.name} onChange={(e) => handleChange(index, e)} required />
                        <input type="url" name="linksUrl" placeholder="URL" value={link.url} onChange={(e) => handleChange(index, e)} required />
                    </div>
                ))}
                <br />
                <button type="submit" style={{color:'white'}}>Submit</button>
            </form>
        </div>
    );
};

export default UpdateCard;
