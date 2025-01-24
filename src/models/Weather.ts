/*
    Author: Lindsey Somwaru
    Date Last Edited: 24 Jan 2025
*/

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Weather {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    city!: string;

    @Column("float")
    temperature!: number;

    @Column()
    description!: string;

    @Column({ type: "datetime" })
    timestamp!: Date;
}