import { useState, useEffect, useCallback } from 'react'

// Global state — command palette open/close
let listeners = []
let isOpen = false

function notify() {
    listeners.forEach((fn) => fn(isOpen))
}

export function openCommandPalette() { isOpen = true; notify() }
export function closeCommandPalette() { isOpen = false; notify() }
export function toggleCommandPalette() { isOpen = !isOpen; notify() }

export function useCommandPalette() {
    const [open, setOpen] = useState(isOpen)

    useEffect(() => {
        const handler = (val) => setOpen(val)
        listeners.push(handler)
        return () => { listeners = listeners.filter((l) => l !== handler) }
    }, [])

    // Ctrl+K / Cmd+K global shortcut
    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                toggleCommandPalette()
            }
            if (e.key === 'Escape' && isOpen) {
                closeCommandPalette()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return { open, openPalette: openCommandPalette, closePalette: closeCommandPalette }
}