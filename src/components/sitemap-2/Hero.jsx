'use client';
import axios from 'axios';
import React, { useState, useEffect, use } from 'react';
import Navbar from '../sitemap/Navbar';
import SideBar from '../sitemap/Sidebar';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import SortableAccordionItem from '../SortableAccordionItem';
import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
// import SideEditor from '../sitemap/SideEditor';
import {
    SelectItem,
    Select,
    SelectContent,
    SelectTrigger,
} from "@/components/ui/select";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from "@/components/ui/accordion";
import ReactFlow, {
    Handle,
    Position,
    useNodesState,
    useEdgesState,
    Background,

} from "reactflow";
import "reactflow/dist/style.css";
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';


console.log({
    Navbar,
    SideBar,
    SortableAccordionItem,
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    ReactFlow
});


const PageNode = ({ id, data }) => {
    const [sections, setSections] = useState(data.sections);
    const [hoverIdx, setHoverIdx] = useState(1);
const handleAddSection = () => {
       const name = window.prompt('New section name')?.trim();
       if (!name) return;
       const description = window.prompt('Section description') || '';
       const newSection = {
           id: `${id}-section-${Date.now()}`,
           name,
           description
       };
       setSections(prev => [...prev, newSection]);
   };

   const handleAddSectionAfter = (afterSectionId) => {
     const name = window.prompt('New section name')?.trim();
     if (!name) return;
     const description = window.prompt('Section description') || '';
     const newSection = {
         id: `${id}-section-${Date.now()}`,
         name,
         description
     };
     setSections(prev => {
         const idx = prev.findIndex(s => s.id === afterSectionId);
         if (idx === -1) return [...prev, newSection];
         const copy = [...prev];
         copy.splice(idx + 1, 0, newSection);
         return copy;
     });
 };

 
    useEffect(() => {
        console.log('Page sections:', sections);
        sections.forEach((section, index) => {
            if (!section.id) {
                console.warn(`Section at index ${index} has no ID:`, section);
            }
        });
    }, [sections]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        console.log('Drag - Active:', active.id, 'Over:', over.id);

        setSections((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            if (oldIndex === -1 || newIndex === -1) {
                console.warn('Could not find items for drag operation');
                return items;
            }

            const newItems = arrayMove(items, oldIndex, newIndex);
            console.log('New section order:', newItems.map(item => item.name));
            return newItems;
        });
    };
    


    const sectionsWithIds = sections.map((section, index) => ({
        ...section,
        id: section.id || `${id}-section-${index}`
    }));

    return (
        <div className="relative bg-white border rounded-xl shadow-sm p-3 w-32">
            <Handle type="target" position={Position.Top} id={`${id}-t`} style={{ background: "#555" }} />
            <Handle type="source" position={Position.Bottom} id={`${id}-b`} style={{ background: "#555" }} />
            <Handle type="source" position={Position.Right} id={`${id}-r`} style={{ background: "#555" }} />
            <Handle type="source" position={Position.Left} id={`${id}-l`} style={{ background: "#555" }} />

            <div className="w-full">
                <div className="flex gap-1">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#D7D3C9" />
                    </svg>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#D7D3C9" />
                    </svg>
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#D7D3C9" />
                    </svg>
                </div>
                <h3 className="font-semibold text-sm mb-2 mt-3 text-center bg-sprout-color-secondary-lightest text-black p-0.5 rounded-md">
                    {data.title}
                </h3>
            </div>

            <div className="flex flex-col gap-2 nodrag">
            <div className="flex justify-end mb-1">
                   {/* <button
                       onClick={handleAddSection}
                       className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                       aria-label="Add section"
                   >
                       Add section
                   </button> */}
               </div>
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={sectionsWithIds.map(s => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {sectionsWithIds.map((section) => (
                            <SortableAccordionItem
                                key={section.id}
                                id={section.id}
                                className="ml-0"
                            >
                                {({ dragAttributes, dragListeners }) => (
                                    <div>
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem
                                                value={`item-${section.id}`}
                                                className="
                                                data-[state=open]:bg-sprout-color-success-lightest
                                        data-[state=open]:border-sprout-color-success
                                       border border-sprout-color-border-weak rounded-md bg-white shadow-sm overflow-visible
                                       data-[state=open]:bg-sprout-color-success-lightest data-[state=open]:border-sprout-color-success
                                                "
                                            >
                                                <AccordionTrigger
                                                    className="[&>svg]:hidden 
                                                flex items-center justify-between w-full px-2 py-1.5 text-xs 
                                                font-medium text-gray-800 hover:no-underline group relative
                                                data-[state=open]:bg-sprout-color-success-lightest
                                                data-[state=open]:border-sprout-color-success
                                            "
                                                    style={{ minWidth: "140px", maxWidth: "180px" }}
                                                >

                                                    <span className="truncate ml-2 flex-1 text-left">
                                                        {section.name}
                                                    </span>

                                                    <Tooltip >
                                                        <TooltipTrigger asChild={true}>
                                                            <span
                                                                className="cursor-grab active:cursor-grabbing absolute left-1  top-1.5 text-gray-500 text-[12px] flex-shrink-0 hover:text-gray-700 opacity-0 group-hover:opacity-100 text-md transition-opacity"
                                                                {...dragAttributes}
                                                                {...dragListeners}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();
                                                                }}
                                                            >
                                                                ⠿
                                                            </span>

                                                        </TooltipTrigger>

                                                    </Tooltip>
                                                  <span
                                                       className="absolute left-20 z-30 text-gray-600 rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer  pointer-events-auto"
                                                       onClick={(e) => {
                                                           e.stopPropagation();
                                                           e.preventDefault();
                                                         
                                                           handleAddSectionAfter(section.id)
                                                       }}
                                                       role="button"
                                                       aria-label={`Open editor for ${section.name}`}
                                                   >
                                                       <span className="inline-block text-sm leading-none">+</span>
                                                   </span>
                                                </AccordionTrigger>

                                                <AccordionContent asChild={true}
                                                    className="
                                                        px-2
                                                        py-1
                                                        text-[10px]
                                                        text-gray-700
                                                        leading-snug
                                                        border-b
                                                        border-sprout-color-success
                                                        bg-white
                                                        data-[state=open]:!bg-sprout-color-success-lightest
  "
                                                >
                                                    {section && typeof section === "object" && section.description
                                                        ? section.description
                                                        : "No description available."}
                                                </AccordionContent>

                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                )}
                            </SortableAccordionItem>
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};

const nodeTypes = { pageNode: PageNode };


const transformApiData = (apiData) => {
    if (!apiData || !apiData.pages) return { pages: [], edges: [] };

    const pages = apiData.pages;
    const transformedPages = [];
    const edges = [];

    const homePosition = { x: 500, y: 50 };
    const rowGap = 200;
    const colGap = 300;

    let homePageIndex = pages.findIndex(page =>
        page.name.toLowerCase() === 'home' || page.name.toLowerCase() === 'homepage'
    );

    if (homePageIndex === -1) homePageIndex = 0;

    pages.forEach((page, index) => {
        let position;

        if (index === homePageIndex) {
            position = homePosition;
        } else {
            const adjustedIndex = index > homePageIndex ? index - 1 : index;
            const row = Math.floor(adjustedIndex / 3) + 1;
            const col = adjustedIndex % 3;
            position = {
                x: 300 + (col * colGap),
                y: homePosition.y + (row * rowGap)
            };
        }


        const sectionsWithIds = page.sections ? page.sections.map((section, sectionIndex) => ({
            id: `${page.id}-section-${sectionIndex}`,
            name: section.name || section.title || "Untitled Section",
            description: section.description || ""
        })) : [];

        transformedPages.push({
            id: page.id,
            type: "pageNode",
            position: position,
            data: {
                title: page.name,
                sections: sectionsWithIds
            }
        });

        if (index !== homePageIndex) {
            edges.push({
                id: `edge-${pages[homePageIndex].id}-${page.id}`,
                source: pages[homePageIndex].id,
                sourceHandle: `${pages[homePageIndex].id}-b`,
                target: page.id,
                targetHandle: `${page.id}-t`,
                type: "smoothstep"
            });
        }
    });

    return {
        pages: transformedPages,
        edges: edges
    };
};

const defaultData = {
    pages: [
        {
            id: "1",
            title: "Homepage",
            position: { x: 500, y: 50 },
            sections: [
                { id: "1-section-0", name: "Navbar" },
                { id: "1-section-1", name: "Hero" },
                { id: "1-section-2", name: "Footer" },
                { id: "1-section-3", name: "Careers" }
            ],
        },
        {
            id: "2",
            title: "About Us",
            position: { x: 300, y: 250 },
            sections: [
                { id: "2-section-0", name: "Header" },
                { id: "2-section-1", name: "Content" },
                { id: "2-section-2", name: "Footer" }
            ],
        },

    ],
    edges: [
        { id: "e1-2", source: "1", sourceHandle: "1-b", target: "2", targetHandle: "2-t", type: "smoothstep" },

    ]
};

const Hero = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState(null);
    const [selectedPages, setSelectedPages] = useState("2");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState("english")
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedData, setGeneratedData] = useState(null);
    const [showPromptInput, setShowPromptInput] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()
    const [projectName, setProjectName] = useState('Project Name')
    const [sectionNames, setSectionNames] = useState([])
    const [sidePanelSection, setSidePanelSection] = useState(null)

    const generateSitemap = async (userPrompt) => {
        setIsGenerating(true);
        try {
            const res = await axios.post('http://localhost:4000/api/generate-structure', {
                prompt: userPrompt,
                pages: selectedPages,
                language
            });

            const apiData = res.data;
            console.log(apiData)
            console.log(apiData.projectName)
            setGeneratedData(apiData);
            const allSectionNames = apiData.pages.flatMap(page =>
                page.sections.map(section => section.name)
            );

            console.log(allSectionNames);
            setSectionNames(allSectionNames)

            const response = await axios.post('http://localhost:4000/api/save/all-sections', {
                sectionNames: allSectionNames,        // Use computed value
                projectName: apiData.projectName
            })
            console.log("Response from all-sections API:", response.data);


            setProjectName(apiData.projectName)
            setShowPromptInput(false);
        } catch (error) {
            console.error('Error generating sitemap:', error);
            alert('Error generating sitemap. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };



    const regenerate = () => {
        setGeneratedData(null);
        setPrompt("");
        setShowPromptInput(true);
        setProjectName('Project Name')
        setNodes([]);
        setEdges([]);
    };
    const saveSiteMap = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/save-sitemap', {
                projectName,
                nodes,
                edges,
                prompt,
                language,
            });
            setIsSaving(false)
            if (response.status === 200) {
                alert('Sitemap has been saved!');

            } else {
                alert('Failed to save sitemap.');
            }
        } catch (error) {
            console.error('Error saving sitemap:', error);
            alert('Something went wrong while saving the sitemap.');
        }
    };

    const handleSubmitPrompt = (e) => {
        e.preventDefault();
        if (prompt.trim()) {
            generateSitemap(prompt.trim());
        }
    };

    useEffect(() => {
        let dataToUse;
        console.log(selectedNode)
        if (generatedData) {
            dataToUse = transformApiData(generatedData);
        } else {
            dataToUse = defaultData;
        }

        if (dataToUse.pages) {
            setNodes(dataToUse.pages);
            setEdges(dataToUse.edges || []);
        }
    }, [generatedData, setNodes, setEdges]);

    if (showPromptInput) {
        return (
            <div className="flex flex-col h-screen text-white">
                <Navbar projectName={projectName} />
                <div className="flex min-h-screen">
                    <SideBar />
                    <main className="bg-[#FFFDFA] text-black flex-1 overflow-y-auto rounded-t-xl">
                        <div className="h-full w-80 border p-6">
                            <div className="text-xl font-[500] text-sprout-color-text-default">Project</div>


                            <div className="pt-5 gap-8 flex items-start justify-between">
                                <div className="text-sprout-color-text-weaker text-lg font-[500]">
                                    Sitemap Prompt <span className="text-red-600">*</span>
                                </div>
                                <div className="text-sprout-color-text-disabled font-[500] cursor-pointer underline decoration-1 decoration-dotted underline-offset-2 decoration-sprout-color-text-disabled">
                                    Try example
                                </div>
                            </div>

                            <div className="relative mt-6 rounded-md">
                                <textarea
                                    id="description"
                                    placeholder=" "
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="peer w-full border border-sprout-color-border-weak bg-sprout-color-background-weaker rounded-md text-black placeholder-transparent px-3 md:px-4 pt-4 md:pt-6 text-sm md:text-base focus:outline-none h-24 md:h-28 lg:h-32 resize-none"
                                />
                                {!prompt && (
                                    <label
                                        htmlFor="description"
                                        className="absolute left-7 md:left-4 top-3 md:top-4 text-sm md:text-base text-sprout-color-text-disabled transition-all
                                        peer-placeholder-shown:opacity-100
                                        peer-focus:opacity-0 peer-focus:hidden
                                        pointer-events-none"
                                    >
                                        A compelling hero section with a catchy tagline, a brief description of the agency, and a call-to-action button.
                                    </label>
                                )}
                            </div>


                            <div className="mt-4">
                                <div className="flex flex-col gap-2">
                                    <div className="text-sprout-color-text-weaker font-[500] text-lg">Number of Pages</div>
                                    <Select value={selectedPages} onValueChange={setSelectedPages}>
                                        <SelectTrigger className="text-black w-[270px] h-[48px]">
                                            <div className="text-lg text-sprout-color-text-default">
                                                {selectedPages} page{selectedPages > 1 ? "s" : ""}
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                                <SelectItem key={num} value={String(num)} className="text-lg p-2 border-b">
                                                    {num} page{num > 1 ? "s" : ""}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>


                            <div className="mt-6">
                                <div className="flex flex-col gap-2">
                                    <div className="text-sprout-color-text-weaker font-[500] text-lg">Language</div>
                                    <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger className="text-black w-[270px] h-[48px]">
                                            <div className="text-lg text-sprout-color-text-default">{language}</div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {["English (US)", "Hindi", "Spanish", "French", "Gujarati"].map((lang) => (
                                                <SelectItem key={lang} value={lang} className="text-lg p-2 border-b">
                                                    {lang}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="mt-6 flex flex-col gap-3">
                                <Button
                                    className="bg-sprout-color-secondary w-[270px] h-[48px] hover:bg-sprout-color-secondary cursor-pointer"
                                    onClick={handleSubmitPrompt}
                                    disabled={loading || isGenerating}
                                >
                                    {isGenerating ? 'Generating design...' : 'Generate design'}
                                </Button>
                                <span className="text-sprout-color-text-disabled text-center text-sm pl-4">
                                    This will override all page sections.
                                </span>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen text-white">
            <Navbar projectName={projectName} />
            <div className="relative flex min-h-screen">
                <SideBar />
                <div className="absolute top-3 flex gap-3 right-3 ">
                    <Button
                        className=" bg-sprout-color-success-lightest hover:bg-sprout-color-success-lightest  border border-sprout-color-success  text-gray-700 cursor-pointer z-50 "
                        onClick={regenerate}
                    >
                        Regenerate
                    </Button>

                    <Button
                        onClick={() => {
                            setIsSaving(true);
                            saveSiteMap();
                        }}
                        className="bg-white border border-black hover:text-white hover:bg-black text-black cursor-pointer z-50"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                </div>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    onNodeClick={(_, node) => setSelectedNode(node)}
                    fitView

                >
                    <Background />
                </ReactFlow>
                {sidePanelSection && (
                    <aside className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">{sidePanelSection.name}</h3>
                            <button
                                onClick={() => setSidePanelSection(null)}
                                className="text-2xl leading-none p-1"
                                aria-label="Close side panel"
                            >
                                ×
                            </button>
                        </div>
                        <div className="text-sm text-gray-700">
                            <p className="mb-3">{sidePanelSection.description || "No description available."}</p>
                            {/* Add editing fields or a real SideEditor component here */}
                        </div>
                    </aside>
                )}
                {/* {selectedNode && (
                    <SideEditor
                        node={selectedNode}
                        onSave={handleSaveNode}
                        onClose={() => setSelectedNode(null)}
                    />
                )} */}
            </div>
        </div>
    );
};

export default Hero;