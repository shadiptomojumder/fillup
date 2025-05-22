{/* <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="h-11 w-full justify-between border-none bg-gray-100 hover:bg-gray-100">
                            {selectedUniversity ? selectedUniversity.label : "Select university..."}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                        <Command>
                            <CommandInput placeholder="Select university..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                    {universities.map((institute) => (
                                        <CommandItem
                                            key={institute.value}
                                            value={institute.label}
                                            onSelect={(currentValue) => {
                                                const selected = universities.find(
                                                    (u) => u.label === currentValue,
                                                );
                                                setSelectedUniversity(selected || null);
                                                setOpen(false);
                                            }}>
                                            {institute.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    selectedUniversity?.value === institute.value
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover> */}