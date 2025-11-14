'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
        Accordion,
        AccordionItem,
        AccordionTrigger,
        AccordionContent
    } from "@/components/ui/accordion";
import axios from "axios"
import { useEffect } from "react"
import ReactFlow, {
        Handle,
        Position,
        useNodesState,
        useEdgesState,
        Background,
        Controls,
    } from "reactflow";
    import "reactflow/dist/style.css";
    import { redirect, useParams } from 'next/navigation'
    import Navbar from "../sitemap/Navbar";
import { Button } from "../ui/button";
    const PageNode = ({ id, data }) => {

        const getSectionName = (section) => {
            if (typeof section === 'string') {
                return section;
            }
            if (section && typeof section === 'object') {
                return section.name || section.title || section.id || 'Section';
            }
            return 'Section';
        };
    
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
                    <h3 className="font-semibold text-sm mb-2 mt-3 text-center bg-sprout-color-secondary-lightest text-black p-0.5  rounded-md">
                        {data.title}
                    </h3>
                </div>
    
                <div className="flex flex-col gap-2">
                    {data.sections?.map((section, idx) => (
                        <Accordion type="single" collapsible key={idx} className="w-full">
                            <AccordionItem
                                value={`item-${idx}`}
                                className={`
          border border-sprout-color-border-weak rounded-md bg-white shadow-sm overflow-hidden
          data-[state=open]:bg-sprout-color-success-lightest data-[state=open]:border-sprout-color-success
        `}
                            >
                                <AccordionTrigger
                                    className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-medium text-gray-800 
                     hover:bg-sprout-color-success-lightest rounded-md no-underline hover:no-underline focus:no-underline"
                                    style={{
                                        minWidth: "140px",
                                        maxWidth: "180px",
                                    }}
                                >
                                    <span className="truncate">{getSectionName(section)}</span>
                                </AccordionTrigger>
    
                                <AccordionContent
                                    className="px-2 py-1 text-[10px] text-gray-700 bg-sprout-color-success-lightest border-b border-sprout-color-success leading-snug"
                                >
                                    {section && typeof section === "object" && section.description
                                        ? section.description
                                        : "No description available."}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
    
                    ))}
                </div>
    
    
    
    
            </div>
        );
    };
    
    const nodeTypes = { pageNode: PageNode };
    
export default function Allsitemaps() {
        const {id} = useParams()
        const [nodes, setNodes, onNodesChange] = useNodesState([])
        const [edges, setEdges, onEdgesChange] = useEdgesState([])
        const [projectName,setProjectName] = useState([])
        const router = useRouter()
        const [sitemap, setSitemap] = useState(null)
    const DeleteSideMap = async()=>{
        const response = await axios.delete(`http://localhost:4000/api/delete-sitemap/${id}`)
        console.log(response.data)
        router.push('/saved-sitemaps')
    }
                useEffect(() => {
                        const fetchSitemap = async () => {
                          try {
                            const res = await axios.get(`http://localhost:4000/api/sitemaps/${id}`)
                            setNodes(res.data.nodes || [])
                            setEdges(res.data.edges || [])
                            setProjectName(res.data.projectName || [])
                            setSitemap(res.data)
                          } catch (err) {
                            console.error('Error loading sitemap:', err)
                          }
                        }
                    
                        if (id) fetchSitemap()
                      }, [id])
        return (
                <>
   <div className="flex flex-col h-screen text-white">
            <Navbar projectName={projectName} />
    <Button className="absolute top-5 right-5 cursor-pointer z-50" onClick={()=>DeleteSideMap()}>Delete</Button>       
            <div className="relative flex min-h-screen">

            <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Background />
                </ReactFlow>
                
                </div>
            </div>

                </>
        )
}