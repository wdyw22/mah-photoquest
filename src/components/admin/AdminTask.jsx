'use client'

import { useQuest } from "@/context/QuestContext";
import styles from './AdminTask.module.css'
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const AdminTask = () => {
    const { tasks } = useQuest()
    const [form, setForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const nextIndex = tasks.length > 0
        ? Math.max(...tasks.map(t => t.order_index)) + 1
        : 1

    const [data, setData] = useState({
        title: "",
        description: "",
        image_hint: "",
        order_index: nextIndex,
    })

    const handleChange = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleDelete = async (id) => {
    if (!confirm('Удалить задание?')) return

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

    if (error) {
        alert('Произошла ошибка при удалении!')
        console.error(error)
        return
    }

    window.location.reload()
}

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase
            .from('tasks')
            .insert([{ ...data, order_index: Number(data.order_index) }])

        setLoading(false)

        if (error) {
            console.log(error)
            alert('Не удалось создать задание')
            return
        }

        setForm(false)
        setData({ title: "", description: "", image_hint: "", order_index: nextIndex + 1 })
        window.location.reload()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>Задания</h2>
                <button className={styles.addButton} onClick={() => setForm(f => !f)}>
                    {form ? 'Отмена' : '+ Добавить задание'}
                </button>
            </div>

            {form && (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>Название</label>
                        <input
                            className={styles.input}
                            name="title"
                            type="text"
                            value={data.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Описание</label>
                        <input
                            className={styles.input}
                            name="description"
                            type="text"
                            value={data.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Подсказка (необязательно)</label>
                        <input
                            className={styles.input}
                            name="image_hint"
                            type="text"
                            value={data.image_hint}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Порядковый номер</label>
                        <input
                            className={styles.input}
                            name="order_index"
                            type="number"
                            min={1}
                            value={data.order_index}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className={styles.submitButton} type="submit" disabled={loading}>
                        {loading ? 'Создаём...' : 'Создать задание'}
                    </button>
                </form>
            )}

            <div className={styles.tasks}>
                {tasks.map(task => (
                    <div key={task.id} className={styles.task}>
                        <div className={styles.taskIndex}>{task.order_index}</div>
                        <div className={styles.taskContent}>
                            <p className={styles.taskTitle}>{task.title}</p>
                            <p className={styles.taskDescription}>{task.description}</p>
                            {task.image_hint && (
                                <p className={styles.taskHint}>Подсказка: {task.image_hint}</p>
                            )}
                        </div>
                        <button onClick={() => handleDelete(task.id)} className={styles.submitButton}>Удалить задание</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminTask