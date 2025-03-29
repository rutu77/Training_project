import { Category } from "../models/Category";
import { categoryRepository } from "../repositories/categoryRepository";

export class CategoryService{

    async createcategory(categoryData: Partial<Category>){
        const category = categoryRepository.create(categoryData);
        return await categoryRepository.save(category);
    }
    
    async getCategoryById(id: number){
        const category = await categoryRepository.findOne({ where: { category_id: id } });
        if (!category) throw new Error("Category not found!");
        return category;
    }

    async updateCategoryById(id: number, data: Partial<Category>){
        await categoryRepository.update(id, data);
        const updatedCategory = await categoryRepository.findOne({ where: { category_id: id } });
        if (!updatedCategory) throw new Error("Category not found!");
        return updatedCategory;
    }

    async deleteCategory(id: number){
        const result = await categoryRepository.delete(id);
        if (result.affected === 0) throw new Error("Category not found!");
    }

    async getAllCategories(){
        return await categoryRepository.find();
    }
}
