import type { SceneNode } from "@/types/scene";

type RegistryListener = () => void;

export class RuntimeRegistry {
    private readonly sceneNodes =
        new Map<string, SceneNode>();

    private readonly listeners =
        new Set<RegistryListener>();

    registerScene(node: SceneNode): void {
        this.sceneNodes.set(node.id, node);
        this.notify();
    }

    unregisterScene(id: string): void {
        const deleted = this.sceneNodes.delete(id);

        if (deleted) {
            this.notify();
        }
    }

    getScene(id: string): SceneNode | undefined {
        return this.sceneNodes.get(id);
    }

    getScenes(): SceneNode[] {
        return [...this.sceneNodes.values()].sort(
            (first, second) =>
                first.order - second.order,
        );
    }

    hasScene(id: string): boolean {
        return this.sceneNodes.has(id);
    }

    subscribe(listener: RegistryListener): () => void {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }

    clear(): void {
        if (this.sceneNodes.size === 0) {
            return;
        }

        this.sceneNodes.clear();
        this.notify();
    }

    private notify(): void {
        for (const listener of this.listeners) {
            listener();
        }
    }
}