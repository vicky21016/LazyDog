'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'next/image'
import Header from "../../components/layout/header";

const favorite = ({ userId, itemId, itemType }) => {
    const [favorite, setfavorite] = useState(false);

    useEffect(() => {
        axios.get(`/favorites?user_id=${userId}`).then((res) => {
            const result = res.data.some(e => e.item_id === itemId && e.item_type === itemType);
            setfavorite(result);
        });
    }, [userId, itemId, itemType]);

    const favoriteBtn = async () => {
        if (favorite) {
            await axios.delete(`/favorites/${itemId}`);
        } else {
            await axios.post('/favorites', { user_id: userId, item_id: itemId, item_type: itemType });
        }
        setfavorite(!favorite);
    };

    return (
        <>
              <Header />
        <button onClick={favoriteBtn} className={favorite ? "btn-fav active" : "btn-fav"}>
            {favorite ? "取消收藏" : "加入收藏"}
        </button>
        </>
    );
};

export default favorite;